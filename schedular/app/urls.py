from django.urls import path

from . import views

app_name = "app"
urlpatterns = [
    path("login/", views.login_user, name="login"),
    path("register/", views.register, name="register"),
    path("register/check-username/", views.check_username, name="check-username"),
    path("register/check-password/", views.check_password_data, name="check-password"),
    path("register/check-password-confirmation/", views.check_password_confirmation, name="check-password-confirmation"),
    path("register/register-user", views.register_user, name="register-user"),
    path("logout/", views.logout_user, name="logout"),
    path("profile/", views.profile, name="profile"),
    path("edit-profile/", views.edit_profile, name="edit-profile"),
    path("calendar/", views.calendar, name="calendar"),
    path("create-template/", views.create_template, name="create-template"),
    path("delete-template/", views.delete_template, name="delete-template"),
    path("create-event/", views.create_event, name="create-event"),
    path("get-events/", views.get_events, name="get-events"),
    path("delete-event/", views.delete_event, name="delete-event"),
    path("day-plan/", views.day_plan, name="day-plan"),
]