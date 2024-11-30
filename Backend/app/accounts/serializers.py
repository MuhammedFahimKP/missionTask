from django.contrib.auth import get_user_model


from rest_framework import serializers
from rest_framework.exceptions import NotFound,NotAuthenticated

from utils.exception import AlreadyExist


from .models import Department

USER = get_user_model() 


class EmployeeListSerializer(serializers.ModelSerializer):
    
    
    dept = serializers.SerializerMethodField()
 
    def get_department(self,obj) -> str:
        return obj.department.name
   
    
    class Meta:
        fields = [ 'id','name','dept','email']
   
    


class EmployeeCreateSerailizer(serializers.ModelSerializer):
    
    dept = serializers.CharField()
    
    
    
    def validate(self, data):
        
        
        email = data['email']
        
        user_exists = USER.objects.filter(email=email)
        
        if user_exists:             
            raise AlreadyExist({'email':'is already taken by another employee'})
        
        
        dept = data['dept']
        
        _dept = Department.objects.filter(name__iexact=dept)
        
        if _dept.exists() == False:
            raise serializers.ValidationError({'dept':f'{dept} is not valid department'}) 
        
        dept = _dept.first()
        data['dept'] = dept
        
        
            
        
                
        return data  
    
    
    def create(self,validated_data):
        
        instance = USER.objects.create(**validated_data)
        response_data = self.to_representation(instance) 
        
        response_data['dept'] = validated_data['dept'].name
        
        return response_data
    
    
    class Meta:
        
        model  = USER
        fields = [ 'id','name','email','password','dept']
        extra_kwargs = {
            
            
            'id' : {
            
                'read_only':True,
            },
            
            'name':{
                'required':True,
            },
            
            'dept':{
                'write_only':True,
            }
            
        }
    
          
class EmployeeUpdateSerailizer(serializers.ModelSerializer):
    
    
    def validate(self, data):
        
        dept = data.get('dept')
        email = data.get('email')
        
        
        
            
        
        
        if dept is not None:
            
            _dept = Department.objects.filter(name__iexact=dept)
        
            if _dept.exists() == False:
                raise serializers.ValidationError({'dept':f'{dept} is not valid department'})
             
            dept = _dept.first()
            data['dept'] = dept
        
        
        
        return data  
    
    
    def update(self,instance,validated_data):
        email       = validated_data.get('email')
        email_exist = USER.objects.filter(email=email).exclude(id=instance.id).exists()
        
        if email_exist == True:
            raise serializers.ValidationError({'email':'email is already taken'})
             
        

        
        instance.name     = validated_data.get('name',instance.name)
        instance.email    = validated_data.get('email',instance.email)
        instance.save()
    
        response_data     =  self.to_representation(instance)
        response_data['department'] = validated_data['dept'].name if validated_data['dept'] else instance.dept.name 
        
        return response_data
        
        
        
        
        
    
    
    
     
    class Meta:
        
        model  = USER
        fields = [ 'id','name','email','password','dept']
        extra_kwargs = {
            
            'id' : {
            
                'read_only':True,
            },
            
            'dept':{
                'write_only':True,
            }
            
        }
        
    

class EmployeeLoginSerailizer(serializers.Serializer):
    
    email    = serializers.EmailField()
    name     = serializers.CharField(write_only=True)
    dept     = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)  
    
    
    
    def validate(self, data):
        
        email = data['email']
        password = data['password']
        
        
        try :
            
            user = USER.objects.get(email=email)
            
        except USER.DoesNotExist:    
            
            raise NotFound({'email':'user with this mail not found'})
        
        
        if user.check_password(password) == False:
            
            raise NotAuthenticated({'password':'incorrect password'})
               
        
        data = {
            'name':user.name,
            'email':user.email,
            'dept':user.dept.name
        }    
            
        return 
    
    class Meta:
        
        fields = ['name','email','password','dept']
        
class EmployeePasswordResetSerailizer(serializers.Serializer):
    
    
    
    def validate(self, attrs):    
        return super().validate(attrs)
        
    
