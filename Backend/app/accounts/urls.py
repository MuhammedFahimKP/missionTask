from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    EmployeeRetriveUpdateDestroyAPIView,
    EmployeeCreateListAPIView,
    EmployeeLoginAPIView,
    EmployeePasswordResetAPIView,
    EmployeeProfileRetriveAPIView,
    DepartmentsListAPIView
)

urlpatterns = [
    path('employee/',view=EmployeeCreateListAPIView.as_view() ,name='employee-create-list'),
    path('employee/<int:pk>/',view=EmployeeRetriveUpdateDestroyAPIView.as_view(),name='employee-retrive-update-destroy'),
    path('employee/login/',view=EmployeeLoginAPIView.as_view(),name='employee-login'),
    path('employee/password-reset/',view=EmployeePasswordResetAPIView.as_view(),name='employee-password-reset'),
    path('employee/profile/',view=EmployeeProfileRetriveAPIView.as_view(),name='employee-profile'),
    path('department/',view=DepartmentsListAPIView.as_view(),name='employee-department'),    
    path('token-refresh/',view=TokenRefreshView.as_view(),name="refresh-jwt")
]