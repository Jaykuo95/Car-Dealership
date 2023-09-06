from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

    def __str__(self):
        return self.vin

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=250)
    status = models.CharField(max_length=20)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Appointment for VIN: {self.vin}"
