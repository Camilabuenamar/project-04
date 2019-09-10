# Generated by Django 2.2.5 on 2019-09-10 12:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Applicant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('image', models.CharField(blank=True, max_length=1000)),
                ('headline', models.CharField(max_length=250)),
                ('roles', multiselectfield.db.fields.MultiSelectField(choices=[('Frontend', 'Frontend'), ('Backend', 'Backend'), ('Full Stack', 'Full Stack'), ('Android', 'Android'), ('Data Science', 'Data Science'), ('Devops', 'Devops'), ('Embedded Systems', 'Embedded Systems'), ('iOS', 'iOS'), ('Machine Learning', 'Machine Learning'), ('Robotics', 'Robotics')], max_length=102)),
                ('linkedin', models.URLField()),
                ('portfolio', models.URLField()),
                ('github', models.URLField()),
                ('cv', models.CharField(max_length=1000)),
                ('skills', multiselectfield.db.fields.MultiSelectField(choices=[('JavaScript', 'JavaScript'), ('Python', 'Python'), ('React', 'React'), ('Java', 'Java'), ('HTML', 'HTML'), ('Git', 'Git'), ('Node.js', 'Node.js'), ('CSS', 'CSS'), ('MySQL', 'MySQL'), ('Amazon Web Services (AWS)', 'Amazon Web Services (AWS)'), ('C++', 'C++'), ('PostgreSQL', 'PostgreSQL'), ('Bash/Shell', 'Bash/Shell'), ('Angular', 'Angular'), ('React Native', 'React Native'), ('MongoDB', 'MongoDB'), ('Ruby on Rails', 'Ruby on Rails'), ('PHP', 'PHP'), ('C', 'C')], max_length=156)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('logo', models.CharField(blank=True, max_length=1000)),
                ('location', models.CharField(max_length=50)),
                ('industry', models.CharField(choices=[('Consumer Goods and Services', 'Consumer Goods and Services'), ('B2B Software and Services', 'B2B Software and Services'), ('Industrial', 'Industrial'), ('Healthcare', 'Healthcare'), ('Education', 'Education'), ('Consumer Media', 'Consumer Media'), ('Government', 'Government'), ('Financial Technology and Services', 'Financial Technology and Services'), ('Agriculture', 'Agriculture'), ('Automotive', 'Automotive'), ('Energy and Environment', 'Energy and Environment'), ('Real Estate and Construction', 'Real Estate and Construction'), ('Aerospace', 'Aerospace')], default=None, max_length=50)),
                ('description', models.CharField(max_length=1000)),
                ('website', models.URLField()),
                ('women_achievements', models.CharField(blank=True, max_length=1000)),
                ('employees', models.IntegerField()),
                ('women_employees_percentaje', models.IntegerField(blank=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jobtitle', models.CharField(max_length=50)),
                ('role', models.CharField(choices=[('Frontend', 'Frontend'), ('Backend', 'Backend'), ('Full Stack', 'Full Stack'), ('Android', 'Android'), ('Data Science', 'Data Science'), ('Devops', 'Devops'), ('Embedded Systems', 'Embedded Systems'), ('iOS', 'iOS'), ('Machine Learning', 'Machine Learning'), ('Robotics', 'Robotics')], default=None, max_length=50)),
                ('wage', models.IntegerField()),
                ('experience_in_years', models.IntegerField()),
                ('description_of_role', models.CharField(max_length=1000)),
                ('technologies', multiselectfield.db.fields.MultiSelectField(choices=[('JavaScript', 'JavaScript'), ('Python', 'Python'), ('React', 'React'), ('Java', 'Java'), ('HTML', 'HTML'), ('Git', 'Git'), ('Node.js', 'Node.js'), ('CSS', 'CSS'), ('MySQL', 'MySQL'), ('Amazon Web Services (AWS)', 'Amazon Web Services (AWS)'), ('C++', 'C++'), ('PostgreSQL', 'PostgreSQL'), ('Bash/Shell', 'Bash/Shell'), ('Angular', 'Angular'), ('React Native', 'React Native'), ('MongoDB', 'MongoDB'), ('Ruby on Rails', 'Ruby on Rails'), ('PHP', 'PHP'), ('C', 'C')], max_length=156)),
                ('qualifications', models.CharField(max_length=1000)),
                ('benefits', models.CharField(max_length=1000)),
                ('applications_received', models.ManyToManyField(blank=True, related_name='offers', to='ada.Applicant')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offers', to='ada.Company')),
            ],
        ),
    ]