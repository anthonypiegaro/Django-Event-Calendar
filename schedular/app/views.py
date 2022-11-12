import json
import datetime
from re import template

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils import timezone

from app.models import *

def register(request):
    return render(request, "app/register.html")

def register_user(request):
    data = json.loads(request.body)
    username = data["username"]
    password = data["password"]
    user = User.objects.create_user(username=username, password=password)
    User_Info.objects.create(user=user, name="NA")
    login(request, user)
    return JsonResponse({"message": "Registered and logged in"})

def logout_user(request):
    logout(request)
    return redirect("app:login")

def check_username(request):
    data = json.loads(request.body)
    username = data["username"]
    valid = True
    length_valid = True
    unique_valid = True
    length_message = "Length is good"
    unique_message = "Username is unique"
    if len(username) < 3:
        length_message = "Username length is too short"
        valid = False
        length_valid = False
    try:
        user = User.objects.get(username=username)
        unique_message = "Username is already taken"
        valid = False
        unique_valid = False
    except:
        pass
    response_data = {
        "valid": valid,
        "lengthValid": length_valid,
        "uniqueValid": unique_valid,
        "length": length_message,
        "unique": unique_message,
    }
    return JsonResponse(response_data)

def check_password_data(request):
    data = json.loads(request.body)
    username = data["password"]
    valid = True
    length_valid = True
    length_message = "Length is good"
    if len(username) < 5:
        length_message = "Password length is too short"
        valid = False
        length_valid = False
    response_data = {
        "valid": valid,
        "lengthValid": length_valid,
        "length": length_message,
    }
    return JsonResponse(response_data)

def check_password_confirmation(request):
    data = json.loads(request.body)
    password = data["password"]
    password_two = data["passwordTwo"]
    response_data = {}
    if password == password_two:
        response_data = {
            "valid": True
        }
    else:
        response_data = {
            "valid": False,
            "message": "Passwords do not match"
        }
    return JsonResponse(response_data)

def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response_data = {
                "valid": True,
                "message": "success",
            }
            return JsonResponse(response_data)
        else:
            response_data = {
                "valid": False,
                "message": "Username or password incorrect"
            }
            return JsonResponse(response_data)
    
    return render(request, 'app/login.html')

@login_required(login_url='app:login')
def profile(request):
    user = request.user
    user_info = User_Info.objects.get(user=user)
    name = user_info.name
    if user_info.birthday == None:
        age = "NA"
    else:
        age = (datetime.date.today() - user_info.birthday).days // 365
    return render(request, "app/profile.html", {"name": name, "age": age,})

@login_required(login_url='app:login')
def edit_profile(request):
    if request.method == "GET":
        user = request.user
        name = request.GET["name"]
        birthday = request.GET["birthday"]
        if name != "":
            User_Info.objects.filter(user=user).update(name=name)
        if birthday != "":
            User_Info.objects.filter(user=user).update(birthday=birthday)
        return redirect("app:profile")

@login_required(login_url='app:login')
def calendar(request):
    user = request.user
    templates = Templates.objects.filter(user=user)
    return render(request, "app/calendar.html", {"templates": templates})

@login_required(login_url='app:login')
def create_template(request):
    if request.method == "GET":
        user = request.user
        name = request.GET['name']
        notes = request.GET['notes']
        Templates.objects.create(user=user, name=name, notes=notes)
    return redirect("app:calendar")

@login_required(login_url='app:login')
def delete_template(request):
    if request.method == "POST":
        user = request.user
        data = json.loads(request.body)
        templateId = data["templateId"]
        Templates.objects.get(user=user, id=templateId).delete()
        return redirect("app:calendar")

@login_required(login_url='app:login')
def create_event(request):
    if request.method == "POST":
        data = json.loads(request.body)
        templateId = data["templateId"]
        date = data["date"]
        user = request.user
        template = Templates.objects.get(id=templateId)
        name = template.name
        notes = template.notes
        Event.objects.create(user=user, name=name, notes=notes, date=date)
    return JsonResponse({"message": "Event successfuly added"})

@login_required(login_url='app:login')
def get_events(request):
    if request.method == "POST":
        data = json.loads(request.body)
        month = data["month"]
        user = request.user
        events = list(Event.objects.filter(user_id__exact=user.id).filter(date__month__exact=month).values())
        return JsonResponse({'events': events,})

@login_required(login_url='app:login')
def delete_event(request):
    if request.method == "POST":
        data = json.loads(request.body)
        id = data["eventId"]
        user = request.user
        Event.objects.get(user=user, id=id).delete()
        return JsonResponse({"message": "You have successfuly deleted an event"})

@login_required(login_url='app:login')
def day_plan(request):
    user = request.user
    date = datetime.date.today()
    events = Event.objects.filter(user=user, date=date)
    return render(request, "app/dayplan.html", {"events": events})