from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from .managers import MyUserManger



# Create your models here.


class Department(models.Model):
    
    name = models.CharField(max_length=100)


    
class MyUser(AbstractBaseUser):
    
    
    email          = models.EmailField(db_index=True,unique=True)
    name           = models.CharField(max_length=100)
    dept           = models.ForeignKey(Department,on_delete=models.CASCADE) 
    
    is_active      = models.BooleanField(default=False)    
    date_joined    = models.DateTimeField(auto_now_add=True)
    last_login     = models.DateTimeField(auto_now=True)
    
    
    objects        = MyUserManger()
    
    
    

    
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name']
    
    
    class Meta:
        ordering = ['email']
    