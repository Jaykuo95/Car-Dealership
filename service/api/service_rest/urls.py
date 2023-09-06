from django.urls import path
from . import views

urlpatterns = [
    path('technicians/', views.api_list_technicians, name='api_list_technicians'),
    path('technicians/<int:id>/', views.api_show_technicians, name='api_show_technicians'),
]
