from django.contrib.auth.models import AbstractBaseUser

from rest_framework_simplejwt.tokens import RefreshToken



def get_jwt_token(user:AbstractBaseUser) -> dict[str,str]:
    
    refresh = RefreshToken.for_user(user)
    access  = refresh.access_token
    
    
    
    return {
        "access":str(access),
        "refresh":str(refresh)
    }