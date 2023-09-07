from django.db import models

# Create your models here.


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.employee_id}'


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.BigIntegerField(null=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=30, unique=True)
    sold = models.BooleanField(default=False)


class Sale(models.Model):
    price = models.TextField(max_length=200, null=True)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
