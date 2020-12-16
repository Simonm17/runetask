from rest_framework import permissions

class IsAdminOrOwner(permissions.BasePermission):


    def has_permission(self, request, view):
        """ 
            Handles permission for User's List API view.
            Only superuser may post/put/delete.
            If not superuser, read only.
            This ensures people create accounts via allauth register.
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        """
            Handles permission for User object instances.
            Only superuser or User owner may post/put/delete.
            If not superuser or owner, read only.
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_superuser or request.user == obj