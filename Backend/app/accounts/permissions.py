from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import IsAdminUser as AdminOnlyPermission


class IsAdminOrHr(AdminOnlyPermission):
    
    
    def has_permission(self, request, view):
        
        if  isinstance(request,AnonymousUser) == False : 
            print('fuck off porker')
            return  request.user.dept.name in [ "ADMIN","HR"]
        
        