import feedparser
import json
import re
from django.shortcuts import render
from django.http import HttpResponse
from blog.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def index(request):
    return render(request, 'blog/index.html')

def signup(request):
    return render(request, 'blog/signup.html')

def profile(request):
    return render(request, 'blog/profile.html')

def blog_view(reqeust):
    return render(reqeust, 'blog/blog_view.html')

def submit_registration(request):
    
    if request.method == 'POST':
        username = request.POST.get('user_name')
        password = request.POST.get('user_pw')
        email = request.POST.get('email')
        print(username + password + email)

        if User.objects.filter(username=username).exists() | User.objects.filter(email=email).exists():
            return JsonResponse({'status': 'error', 'error_detail': 'Username or email duplication error'})

        if len(password) < 8 or not re.search(r'[a-zA-Z]', password):
            return JsonResponse({'status': 'error', 'error_detail': 'Password policy error'})

        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()

        message = 'Sign up Successful !'
        return JsonResponse({'message': message, 'status': 'success'})

def submit_signin(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
           
            username = data.get('user_name')
            password = data.get('user_pw')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                response_data = {'message': 'Login successful !', 'user_name': username}
                return JsonResponse(response_data)
            else:
                response_data = {'message': 'User not found'}
                return JsonResponse(response_data, status=401)

        except json.JSONDecodeError:
            response_data = {'message': 'Invalid JSON format'}
            return JsonResponse(response_data, status=400)

    return JsonResponse({'message': 'Invalid request method'}, status=405)

def signout(request):
    logout(request)
    return redirect('index')
