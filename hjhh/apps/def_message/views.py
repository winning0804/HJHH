import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hjhh.settings")# project_name 项目名称
django.setup()

from django.shortcuts import render,redirect
from django.urls import reverse
from django.contrib import messages

# Create your views here.

