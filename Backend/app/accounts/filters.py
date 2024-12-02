from django.contrib.auth import get_user_model

from django_filters import rest_framework as filters




USER  = get_user_model()

class EmployeeFilterSet(filters.FilterSet):
    
    
    dept = filters.CharFilter(method='filter_departments')
    
    def __init__(self, data=None, queryset=None, *, request=None, prefix=None):
        print(queryset)
        super().__init__(data, queryset, request=request, prefix=prefix)
    
    
    def filter_departments(self,quesryset,name,value):   
        
        

        value        = value.upper()
        departments  = value.split(',')
                
        return quesryset.filter(dept__name__in=departments)
        
        
    
    
    
    
    
    
    class Meta:
        fields = ['dept']
        model  = USER