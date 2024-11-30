from typing import Any

from django.contrib.auth.models import BaseUserManager,Group
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _







class MyUserManger(BaseUserManager):

    def email_validator(self,email):

        try:
            validate_email(email)

        except ValidationError:
            raise ValueError(_("Please enter a valid email address"))    
        
        
    def create(self, **kwargs: Any) -> Any:
        
        email    = kwargs.pop('email')
        name     = kwargs.pop('name')
        dept     = kwargs.pop('dept')
        password = kwargs.pop('password')
        
        return self.create_user(email=email,name=name,password=password,dept=dept,**kwargs)

        
    def create_user(self,email ,name,password,dept, **other_fields):
        
        
        from .models import Department
        
        
        
            
        _dept = Department.objects.filter(name__iexact=dept) 
        
        if _dept.exists() == False:
            raise ValueError(_(f'{dept} is not valid department'))
        
        dept = _dept.first()
            
     
        if email:
            email = self.normalize_email(email)
            self.email_validator
            (email) 
        else:
            raise ValueError(_("You Must provide an Email Address"))    
     
        
        if not name:
            raise ValueError(_("You Must provide a Name")) 
        
       
    

        user  = self.model(email=email,name=name,dept=dept,**other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,email,name,password,**other_fields):
        other_fields.setdefault('is_active',True)
        return self.create_user(email,name,password,dept='ADMIN',**other_fields)