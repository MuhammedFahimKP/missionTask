from typing import Any

from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group 






class Command(BaseCommand):
    
    
    help = "SetUp For Create Department" 
    
    def handle(self, *args: Any, **options: Any) -> str | None:
        
        from ...models import Department
        
        
        DEPARTMENTS = [
            'HR',
            'ADMIN',
            'IT',
            'MARKETING',
        ]
        
        
        for department in DEPARTMENTS :             
            Department.objects.get_or_create(name=department)
           
                   
        
        self.stdout.write(self.style.SUCCESS("Deparetement set up successfully"))
    
    
    