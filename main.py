from flask import Flask,request,jsonify
from flask_cors import CORS
import json
import uuid
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/register', methods=['POST'])
def Register():
    name,email,password,is_resto=dict(request.json).values()
    #name check
    data=dict(request.json)
    if is_resto=='True':
        restaurants=[]
        with open("./JSON/restaurants.json","r") as fp:
            if os.stat("./JSON/restaurants.json").st_size != 0:
                restaurants=json.load(fp)
            if len(restaurants)!=0:
                for i in restaurants:
                    if i['email']==str(email):
                        return "email already existed"
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
                    
                    if i['email']==email:
                        return "email already existed"
            data['id']=str(uuid.uuid4())
            users.append(data)
        with open("./JSON/users.json","w") as fp:
            json.dump(users,fp)
    return "hello"


@app.route('/signin', methods=['POST'])
def Signin():
    email,password,is_resto=dict(request.json).values()
    out=None
    if is_resto=='True':
        restaurants=[]
        with open("./JSON/restaurants.json","r") as fp:
            if os.stat("./JSON/restaurants.json").st_size != 0:
                restaurants=json.load(fp)
            if len(restaurants)!=0:
                for i in restaurants:
                    if i['email']==str(email) and i['password']==str(password):
                        out=i
                        break
                if out==None:
                    return "invalid login"
                else:
                    return "successfully signed in"
            else:
                return "please register yourself"
    else:
        users=[]
        with open("./JSON/users.json","r") as fp:
            if os.stat("./JSON/users.json").st_size != 0:
                users=json.load(fp)
            if len(users)!=0:
                for i in users:
                    if i['email']==str(email) and i['password']==str(password):
                        out=i
                        break
                if out==None:
                    return "invalid login"
                else:
                    return "successfully signed in"
            else:
                return "please register yourself"
@app.route('/restaurants', methods=['GET'])
def getRestro():
    restaurants=[]
    with open("./JSON/restaurants.json","r") as fp:
        if os.stat("./JSON/restaurants.json").st_size != 0:
            restaurants=json.load(fp)
    return  jsonify(restaurants)
@app.route('/additems', methods=['POST'])
def addItems():
    #name check
    restoId,name,cost=dict(request.json).values()
    restaurants=[]
    with open("./JSON/restaurants.json","r") as fp:
        if os.stat("./JSON/restaurants.json").st_size != 0:
            restaurants=json.load(fp)
    for i in restaurants:
        if i['id']==restoId:
            id=str(uuid.uuid4())
            i['items'].append({"id":id,"name":name,"cost":cost})
    with open("./JSON/restaurants.json","w") as fp:
            json.dump(restaurants,fp)
    return "hello"

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
    return ""


@app.route('/orderitems', methods=['POST'])
def orderItems():
    userId,restoName,items,totalCost=dict(request.json).values()
    orders=[]
    with open("./JSON/orders.json","r") as fp:
        if os.stat("./JSON/orders.json").st_size != 0:
            orders=json.load(fp)
        id=str(uuid.uuid4())
        orders.append({"id":id,"userId":userId,"restoName":restoName,"items":items,"totalCost":totalCost})
    with open("./JSON/orders.json","w") as fp:
            json.dump(orders,fp)
    return ""


@app.route('/getorders', methods=['GET'])
def getOrders():
    userId=request.args.get('userId')
    orders=[]
    with open("./JSON/orders.json","r") as fp:
        if os.stat("./JSON/orders.json").st_size != 0:
            orders=json.load(fp)
    for i in orders:
        if i['userId']==userId:
            return jsonify( i)
    return ""
   
if __name__ == "__main__":
   app.run(debug=True)