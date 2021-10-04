from django.apps import AppConfig

# Register signals to Django


class UsersConfig(AppConfig):
    name = 'users'

    def ready(self):
        import users.signals
