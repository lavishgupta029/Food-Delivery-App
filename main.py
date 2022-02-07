from flask import Flask,request,jsonify
from flask_cors import CORS
import json
import uuid
import os
import re
# Creating Flask App 
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# Registration Route -> POST Method
@app.route('/register', methods=['POST'])
def Register():
    name,email,password,is_resto=dict(request.json).values()
    regex =r"(^[a-zA-Z0-9'_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    if name=="" or email=="" or password=="":
        return jsonify( {"error":"Please Enter All Fields"})
    if not re.match(regex, email, re.IGNORECASE):
        return jsonify( {"error":"Please Enter Valid Email Address"})

    data=dict(request.json)
    # Checking if User is Owner or Not
    if is_resto=='true':
        restaurants=[]
        with open("./JSON/restaurants.json","r") as fp:
            if os.stat("./JSON/restaurants.json").st_size != 0:
                restaurants=json.load(fp)
            
            if len(restaurants)!=0:
                for i in restaurants:
                    if str(i['email']).lower()==str(email).lower():
                        return jsonify( {"error":"email already existed"})
            if len(restaurants)!=0:
                for i in restaurants:
                    if str(i['name']).lower()==str(name).lower():
                        return jsonify( {"error":"Name already existed"})
            if len(str(password))<8:
                return jsonify( {"error":"Please Enter Minimum 8 letter password"})
            data['id']=str(uuid.uuid4())
            data['items']=[]
            restaurants.append(data)
        with open("./JSON/restaurants.json","w") as fp:
            json.dump(restaurants,fp)
    else:
        users=[]
        with open("./JSON/users.json","r") as fp:
            if os.stat("./JSON/users.json").st_size != 0:
                users=json.load(fp)
            if len(users)!=0:
                for i in users:
                    if str(i['email']).lower()==str(email).lower():
                        return jsonify( {"error":"email already existed"})
            if len(str(password))<8:
                return jsonify( {"error":"Please Enter Minimum 8 letter password"})
            data['id']=str(uuid.uuid4())
            users.append(data)
        with open("./JSON/users.json","w") as fp:
            json.dump(users,fp)
    return jsonify(data)

# Signin Route -> POST Method
@app.route('/signin', methods=['POST'])
def Signin():
    email,password,is_resto=dict(request.json).values()
    out=None
     # Checking if User is Owner or Not
    if is_resto=='true':
        restaurants=[]
        with open("./JSON/restaurants.json","r") as fp:
            if os.stat("./JSON/restaurants.json").st_size != 0:
                restaurants=json.load(fp)
            if len(restaurants)!=0:
                for i in restaurants:
                    if  str(i['email']).lower()==str(email).lower() and i['password']==str(password):
                        out=i
                        break
                if out==None:
                    return jsonify({"error":"Invalid Login"})
                else:
                    return out
            else:
                return jsonify({"error":"please register yourself"})
    else:
        users=[]
        with open("./JSON/users.json","r") as fp:
            if os.stat("./JSON/users.json").st_size != 0:
                users=json.load(fp)
            if len(users)!=0:
                for i in users:
                    if  str(i['email']).lower()==str(email).lower() and i['password']==str(password):
                        out=i
                        break
                if out==None:
                    return jsonify({"error":"Invalid Login"})
                else:
                    return out
            else:
                return jsonify({"error":"please register yourself"})

# Fetching All Restaurants -> GET Method
@app.route('/restaurants', methods=['GET'])
def getRestro():
    restaurants=[]
    with open("./JSON/restaurants.json","r") as fp:
        if os.stat("./JSON/restaurants.json").st_size != 0:
            restaurants=json.load(fp)
    return  jsonify(restaurants)

# Add Items Route -> POST Method
@app.route('/additems', methods=['POST'])
def addItems():
    name,cost,restoId=dict(request.json).values()
    restaurants=[]
    result=[]
    with open("./JSON/restaurants.json","r") as fp:
        if os.stat("./JSON/restaurants.json").st_size != 0:
            restaurants=json.load(fp)
        if name=="" or cost=="":
             return jsonify( {"error":"Please Enter Name and Cost"})
    
    for i in restaurants:
        if i['id']==restoId:
            for j in i['items']:
                if str(j['name']).lower()==str(name).lower():
                    return jsonify( {"error":"Item Already Existed"})
            id=str(uuid.uuid4())
            i['items'].append({"id":id,"name":name,"cost":cost})
            result=i['items']
            break
    with open("./JSON/restaurants.json","w") as fp:
            json.dump(restaurants,fp)
    return jsonify(result)

# Fetching All Items -> GET Method
@app.route('/getitems', methods=['GET'])
def getItems():
    restoId=request.args.get('restoId')
    restaurants=[]
    with open("./JSON/restaurants.json","r") as fp:
        if os.stat("./JSON/restaurants.json").st_size != 0:
            restaurants=json.load(fp)
    for i in restaurants:
        if i['id']==restoId:
            return jsonify( i['items'])
    return jsonify({"error":"restaurant not found"})

# Order Items Route -> POST Method
@app.route('/orderitems', methods=['POST'])
def orderItems():
    userId,items,totalCost,createdAt=dict(request.json).values()
    orders=[]
    with open("./JSON/orders.json","r") as fp:
        if os.stat("./JSON/orders.json").st_size != 0:
            orders=json.load(fp)
        id=str(uuid.uuid4())
        orders.append({"id":id,"userId":userId,"items":items,"totalCost":totalCost,"createdAt":createdAt})
    with open("./JSON/orders.json","w") as fp:
            json.dump(orders,fp)
    return jsonify("order successfully placed")

#Fetching Orders By Id -> GET Method
@app.route('/getorders', methods=['GET'])
def getOrders():
    userId=request.args.get('userId')
    orders=[]
    myOrders=[]
    with open("./JSON/orders.json","r") as fp:
        if os.stat("./JSON/orders.json").st_size != 0:
            orders=json.load(fp)
    for i in orders:
        if i['userId']==userId:
            myOrders.append(i)
    return jsonify(sorted(myOrders, key=lambda k: k['createdAt'],reverse=True))

#Deleting Items By Id -> Patch Method
@app.route('/deleteitem', methods=['PATCH'])
def deleteItem():
    restoId,itemId=dict(request.json).values()
    restaurants=[]
    resto_items=None
    with open("./JSON/restaurants.json","r") as fp:
        if os.stat("./JSON/restaurants.json").st_size != 0:
            restaurants=json.load(fp)
    for i in restaurants:
        if i['id']==restoId:
            i['items']=[x for x in i['items'] if not (x['id'] == itemId)]
            resto_items = i['items']
    with open("./JSON/restaurants.json","w") as fp:
            json.dump(restaurants,fp)
    return jsonify(resto_items)


# Initializing Server
if __name__ == "__main__":
   app.run(debug=True)