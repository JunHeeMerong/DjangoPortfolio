# Generated by Django 3.2.18 on 2023-04-23 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jun', '0005_auto_20230423_1945'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='click',
            field=models.IntegerField(default='0', null=True),
        ),
    ]