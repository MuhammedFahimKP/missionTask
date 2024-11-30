from django.contrib.auth import get_user_model


from rest_framework import serializers
from rest_framework.exceptions import NotFound,NotAuthenticated

from utils.exception import AlreadyExist

from .models import Department
from .utils import get_jwt_token



USER = get_user_model() 
class EmployeeListSerializer(serializers.ModelSerializer):
    
    
    
    dept = serializers.SerializerMethodField()
 
    def get_dept(self,obj) -> str:
        return obj.dept.name
   
    
    class Meta:
        model = USER
        fields = [ 'id','name','dept','email']


class EmployeeeProfileSerializer(serializers.ModelSerializer):
    
    
    dept = serializers.SerializerMethodField()
    
    
    def get_dept(self,obj) -> str:
        return obj.dept.name 
    
    
    class Meta:
        model = USER
        fields = ['name','dept','email']
       
    


class EmployeeCreateSerailizer(serializers.ModelSerializer):
    
    dept = serializers.CharField()
    email = serializers.EmailField()
    name  = serializers.CharField(min_length=4,required=True)
    password = serializers.CharField(max_length=16,min_length=6,write_only=True,required=True)
    
    
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
        data['dept'] = dept.name
        
        
        
            
        
                
        return data  
    
    
    def create(self,validated_data):
        
        instance = USER.objects.create(**validated_data)
        response_data = self.to_representation(instance) 
        
        response_data['dept'] = validated_data['dept']
        
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
    
    email = serializers.EmailField(required=False)
    dept  = serializers.CharField(required=False)
    name  = serializers.CharField(min_length=4,required=False)
    
    def validate(self, data):
        
        dept = data.get('dept')
        email = data.get('email')
        
        
        
            
        
        
        if dept is not None:
            
            _dept = Department.objects.filter(name__iexact=dept)
        
            if _dept.exists() == False:
                raise serializers.ValidationError({'dept':f'{dept} is not valid department'})
             
            dept = _dept.first()
            data['dept'] = dept.name
        
        
        
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
        response_data['dept'] = validated_data['dept']  
        
        return response_data
        
        
        
        
        
    
    
    
     
    class Meta:
        
        model  = USER
        fields = [ 'id','name','email','dept']
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
    name     = serializers.CharField(read_only=True)
    dept     = serializers.CharField(read_only=True)
    password  = serializers.CharField(max_length=16,min_length=6,write_only=True,required=True)
    access   = serializers.CharField(read_only=True)
    refresh  = serializers.CharField(read_only=True) 
    
    
    
    
    
    def validate(self, data):
        
        email = data['email']
        password = data['password']
        
        
        try :
            
            user = USER.objects.get(email=email)
            
        except USER.DoesNotExist:    
            
            raise NotFound({'email':'user with this mail not found'})
        
        
        if user.check_password(password) == False:
            
            raise NotAuthenticated({'password':'incorrect password'})
        
        
        tokens = get_jwt_token(user)
               
        
        data = {
            'name':user.name,
            'email':user.email,
            'dept':user.dept.name,
            'access':tokens['access'],
            'refresh':tokens['refresh'],
        }    
            
        return data
    
    class Meta:
        
        fields = ['name','email','password','dept']
        
class EmployeePasswordResetSerailizer(serializers.Serializer):
    
    
    password = serializers.CharField(max_length=16,min_length=6,write_only=True,required=True)
    
    
    def validate(self,data):
        
        request = self.context.get('request')
        
        if request is not None and request.user :
            
            password = data['password']        
            request.user.set_password(password)
                        
        return data
    
    
    class Meta:
        
        fields = ['password']
        
    
class DepartmentListSerializer(serializers.ModelSerializer):
    

    
    class Meta:
        model = Department
        fields = ['name']
    
    