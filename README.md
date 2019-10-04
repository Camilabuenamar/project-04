# **SEI-Project-04: ADA  Women 3.0** 👩🏽‍💻👩🏻‍💻

### A hiring app for women developers in gender responsible companies.

## Overview:
Seeking to connect women in tech with companies committed to narrowing the gender gap I decided to create an ADA. A Hiring app that not only shows offers but also gender diversity committed companies and tech women. The ADA Women 3.0 web application works by selecting the different technologies and interests of the women profiles and offers to make matches! During this project, I had the chance to reinforce my knowledge in Front-end and Back-end developing languages to solve a real-world problem that has concerned me for a long while. At the same time, I could create an authentication with two different types of users (applicants and companies).

[Here you can check the website!](https://ada-women30.herokuapp.com/#/offers)

![Screenshot of the App](https://imgur.com/P4PKrQu.jpg)

## Brief:
- Full-Stack application.
- Uses a Python Django API using Django REST Framework to serve your data from a Postgres database.
- Consumes our API with a separate front-end  built with React.
- Has multiple relationships and CRUD functionality.

## Technologies used:
- HTML5
- CSS 3
- JavaScript (ES6)
- Express
- React (React-DOM, React-Router-DOM)
- Python
- Django
- SQL
- Posgres
- Webpack (with CLI)
- Git and GitHub
- Babel
- Lodash
- Axios
- FileStack
- Bulma
- Heroku

## Approach Taken:
- **Problem Solving:** For this project I had the chance to work by myself or in group, I decided to work by myself for two reasons. First, because I want to challenge myself to build a Full-Stack App by my own, with all the limitations and constraints working alone has. And second, because I wanted to work on an issue that has concern me for the last years, the gender gap between men and women in tech roles.
- **User authentication:** One of the principal problems I had to solve was how was I going to be able to create different kind of users, with different information and authentication permissions based in the Django pre-build users. This was important because the information of the pre-build users was not enough or completely align to the one I wanted to request each type of users (applicants and companies).
  - Extending Django users: By creating models and serializers linked one to one I could relate companies and applicant profiles to specific users created with the pre-build function of Django. Here you can see the example of the companies requested information by the created model and its serializer.
  ```Python
    class Company(models.Model):
        INDUSTRY_CHOICES = (...)
        user = models.OneToOneField(User, on_delete=models.CASCADE)
        name = models.CharField(max_length=50)
        logo = models.CharField(max_length=1000, blank=True)
        location = models.CharField(max_length=50)
        industry = models.CharField(max_length=50, choices=INDUSTRY_CHOICES, default=None)
        description = models.CharField(max_length=1000)
        website = models.URLField()
        women_achievements = models.CharField(max_length=1000, blank=True)
        employees = models.IntegerField()
        women_employees_percentaje = models.IntegerField(blank=True)

        def __str__(self):
            return self.user.username
  ```
  ```Python
    class CompanySerializer(serializers.ModelSerializer):

        class Meta:
            model = Company
            fields = ('id', 'name', 'logo', 'location', 'industry', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje')
  ```
  - Ownership of offers: Relationships, one to one, or one to many, are important to this project. Mainly because there are multiple relationships between our three models (companies, offers and applicants). For example one offer can relate to only one company but a company can relate to many offers. This was done throught populated serializers. Here you can see an example of both serializers:
  ``` Python
    class PopulatedCompanySerializer(serializers.ModelSerializer):

        offers = OfferSerializer(many=True)
        user = UserSerializer()

        class Meta(CompanySerializer.Meta):
            fields = ('id', 'user', 'name', 'logo', 'location', 'industry', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje', 'offers')

    class PopulatedOfferSerializer(serializers.ModelSerializer):
        company = CompanySerializer()
        applications_received = ApplicantSerializer(many=True)

        class Meta(OfferSerializer.Meta):
            fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'technologies', 'qualifications', 'benefits', 'applications_received')
  ```

- **Linking Front-end with Back-end:** In order to add React to the Django project, I added a new app called frontend. This app will be responsible for serving the index.html and bundle.js files of the React app.
  - Views: First I added the views, one for serving the index.html and the other to serve any static files.
  ```Python
    class Home(View):

        def get(self, _request):
            with open(os.path.join(os.path.dirname(__file__), 'dist', 'index.html')) as file:
                return HttpResponse(file.read())

    class Assets(View):

        def get(self, _request, filename):
            path = os.path.join(os.path.dirname(__file__), 'dist', filename)

            if os.path.isfile(path):
                with open(path) as file:
                    return HttpResponse(file.read())
            else:
                return HttpResponseNotFound()
  ```
  - URLs: Then I hooked the views to the URLs for the frontend app.
  ```Python
    urlpatterns = [
        path('', Home.as_view(), name='home'),
        re_path(r'^(?P<filename>[\w\.]+)$', Assets.as_view(), name='assets'),
    ]
  ```
    - Then I hooked the app to the settings.py of the project and added the frontend URLs to the project's URLs:
  ```Python
      urlpatterns = [
          path('admin/', admin.site.urls),
          path('auth/', include('rest_framework.urls')),
          path('api/', include('ada.urls')),
          path('api/', include('jwt_auth.urls')),
          path('', include('frontend.urls')),
      ]
  ```  
    - Run the App: to run the app I created new scripts in tha package.json
    ```json
      "scripts": {
        "build": "webpack -p",
        "serve:backend": "python manage.py runserver 4000",
        "serve:frontend": "webpack-dev-server"
        },
    ```
-  **Showing especific offer/company/profile in the same page:** In previous projects I always had separate pages for index and individual show page. In this project I wanted to try something new, so the user could see in the same screen both, the list of offers/companies/applicants with the one they want to explore in detail. To do this it was necessary to set a state with the desired data that will make axios requests to the API so it can be displayed at the moment.
  ```javascript
  showApplicant(e){
    axios.get(`/api/applicants/${e.target.value}/`)
      .then(res => this.setState({ specificapplicant: res.data}))
      .then(console.log(this.state.specificapplicant))
  }
  ```
- **Visual:** Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Wins and blockers:
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Future features:
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
