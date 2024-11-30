from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication



from .permissions import IsAdminOrHr


class BasicJWTAuthMixin:
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]



class AdminOrHrJWTAuthMixin(BasicJWTAuthMixin):
    permission_classes = [IsAuthenticated,IsAdminOrHr]
