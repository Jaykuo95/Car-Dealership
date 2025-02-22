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
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "is_vip",
        "technician"
    ]
    encoders = {
        "technician": TechnicianDetailEncoder()
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

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentDetailEncoder
        )
    else:
        content = json.loads(request.body)
    try:
        technician_id = content["technician_id"]
        technician = Technician.objects.get(id=technician_id)
        content["technician"] = technician

        check = AutomobileVO.objects.filter(vin=content["vin"])
        if check.count() > 0:
            content["is_vip"] = True

        else:
            content["is_vip"] = False

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False
        )
    except:
        response = JsonResponse(
            {"message": "Could not make appointment"}
        )
        response.status_code = 400
        return response


@require_http_methods(["DELETE", "GET"])
def api_show_appointments(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                {"appointment": appointment},
                encoder=AppointmentDetailEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"}, status=404)

    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"message": "Appointment deleted"})

    return HttpResponseBadRequest("Error: Invalid request")


@require_http_methods(["PUT"])
def api_cancel_appointments(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "Canceled"
        appointment.save()

        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    except:
        response = JsonResponse(
            {"message": "Status failed to updated"}
        )
        response.status_code = 400
        return response

@require_http_methods(["PUT"])
def api_finish_appointments(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "Finished"
        appointment.save()

        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    except:
        response = JsonResponse(
            {"message": "Status failed to updated"}
        )
        response.status_code = 400
        return response
