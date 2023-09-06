from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder

# Create your views here.

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer"
    ]
    encoders = {
        "technician": AutomobileVODetailEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):

    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    elif request.method == "POST":
        content = json.loads(request.body)

        try:
            first_name = content.get("first_name", "")
            last_name = content.get("last_name", "")
            employee_id = content.get("employee_id", "")

            technician = Technician.objects.create(
                first_name=first_name,
                last_name=last_name,
                employee_id=employee_id
            )
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianDetailEncoder,
                status=201,
                safe=False
            )
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Error: Invalid JSON data.")

@require_http_methods(["DELETE", "GET"])
def api_show_technicians(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician not found"}, status=404)

    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"message": "Technician deleted"})

    return HttpResponseBadRequest("Error: Invalid request")
