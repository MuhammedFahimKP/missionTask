from rest_framework.pagination import PageNumberPagination

class EmployeeLimitOffsetPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    page_query_param = 'page'
    
    page_size = 10    
    max_page_size = 10 



