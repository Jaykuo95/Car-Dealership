from django.urls import path
from . import views

urlpatterns = [
    path('technicians/', views.api_list_technicians, name='api_list_technicians'),
    path('technicians/<int:id>/', views.api_show_technicians, name='api_show_technicians'),
    path('appointments/', views.api_list_appointments, name='api_list_appointments'),
    path('appointments/<int:id>/', views.api_show_appointments, name="api_show_appointments"),
    path('appointments/<int:id>/cancel/', views.api_cancel_appointments, name="api_cancel_appointments"),
    path('appointments/<int:id>/finish/', views.api_finish_appointents, name="api_finish_appointments"),
]
