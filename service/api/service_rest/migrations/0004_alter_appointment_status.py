# Generated by Django 4.0.3 on 2023-09-06 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_appointment_is_vip_alter_appointment_technician_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(default='Created', max_length=20),
        ),
    ]
