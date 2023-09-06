from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "salesperson",
        "customer",
        "automobile",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

# SALESPEOPLE
@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Unable to create new salesperson"},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"}
            )
    else:
        count, _= Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


# CUSTOMERS
@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Unable to create new customer"},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"}
            )
    else:
        count, _= Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


# SALES
@require_http_methods(["GET", "POST"])
def api_list_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer

            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Unable to create new sale"},
                status=400
            )
        sales = Sale.objects.create(**content)
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"}
            )
    else:
        count, _= Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
