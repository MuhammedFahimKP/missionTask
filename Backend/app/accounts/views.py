
# Create your views here.
from django.contrib.auth import get_user_model


from rest_framework import generics
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response



from .serializers import EmployeeCreateSerailizer,EmployeeListSerializer,EmployeeUpdateSerailizer
from .pagination import EmployeeLimitOffsetPagination

USER = get_user_model()


class EmployeeCreateListAPIView(generics.GenericAPIView):
    
    
    
    
    queryset = USER.objects.all()
    serializer_class =  None
    
    pagination_class = EmployeeLimitOffsetPagination
    
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'GET':
            return EmployeeListSerializer
        
        return EmployeeCreateSerailizer 
    
    
    def get(self,request):
        
        queryset         = self.filter_queryset(self.get_queryset())      
        
        serializer_class = self.get_serializer_class()
        serializer       = serializer_class(queryset,many=True)
        
        
        
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            
            serializer = serializer_class(page,many=True)
            
            return self.get_paginated_response(serializer.data)
        
        return Response(data=serializer.data,status=status.HTTP_200_OK)
        
        
    
    
    def post(self,request):
        
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data = request.data)
        
        if serializer.is_valid(raise_exception=True):
            data = serializer.save()
            return Response(data,status.HTTP_201_CRETED)
        
        return Response(serializer.errors,status=status.HTTP_201_CREATED)
    

class EmployeeRetriveUpdateDestroyAPIView(generics.GenericAPIView):
    
    
    serializer_class       = None
    lookup_field           = 'pk'
    
    
    def handle_404(self,pk:int) -> Response:
        return Response({'detail':f'employee with id {pk} not found'},status=status.HTTP_404_NOT_FOUND)
    
   
    
    
    def get_object(self,**kwargs):
        
        try:
            
            user = USER.objects.get(**kwargs)            
            return user
        
        except USER.DoesNotExist:
            return None 
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'GET':
            return EmployeeListSerializer
        
        
        return EmployeeUpdateSerailizer
         
    
    def get(self,request,pk:int) -> Response:
         
         
        user = self.get_object(id=pk)
        
        if user is None:

            return self.handle_404(pk)
        
        
        serializer_class = self.get_serializer_class()
        serializer       = serializer_class(user)
            
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
    def put(self,request,pk:int) :
        
        
        user  =  self.get_object(id=pk)
        
        serializer_class = self.get_serializer_class()
        serializer       = serializer_class(data=request.data,instance=user)
        
        if user is None:
            return self.handle_404(pk)
    
        if serializer.is_valid(raise_exception=True):
            
            data = serializer.save()
            return Response(data,status=status.HTTP_200_OK)
            
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
    
    
    def delete(self,request,pk:int) -> Response:
        
        user = self.get_object(id=pk)
        
        if user is None:
            
            return self.handle_404(pk)
        
        user.delete()
        
        return Response({},status=status.HTTP_204_NO_CONTENT)


class EmployeeLoginAPIView(generics.GenericAPIView):
    
    
    def post(self,request):
        
        serailizer = None
        
        if serailizer.is_valid(raise_exception=True):
            
            data = serailizer.data
            
            return Response(serailizer.data ,status=status.HTTP_200_OK)
        
        
        return Response(serailizer.error,status=status.HTTP_400_BAD_REQUEST)
             
           