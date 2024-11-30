from django.urls import path
from .views import EmployeeRetriveUpdateDestroyAPIView,EmployeeCreateListAPIView


urlpatterns = [
    path('employee/',view=EmployeeCreateListAPIView.as_view() ,name='employee-create-list'),
    path('employee/<pk:str>/',view=EmployeeRetriveUpdateDestroyAPIView.as_view(),name='employee-retrive-update-destroye'),
    

    
]