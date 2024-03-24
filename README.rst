.. image:: logo.png
  :width: 200
  :alt: Sheriff logo
  :align: center

===================
Sheriff Apply Action
===================

-----
About
-----

This is a Github Action that provides an interface to ``apply`` command for
`Sheriff <https://github.com/gofrontier-com/sheriff>`_, a command line tool to
manage Azure role-based access control (Azure RBAC) and Microsoft Entra
Privileged Identity Management (Microsoft Entra PIM) using desired state configuration.

-----
Usage
-----

~~~~~~~~~~~~~~~~~~~~~~
Sheriff Apply action
~~~~~~~~~~~~~~~~~~~~~~

This task runs the plan action of Sheriff CLI on the agent. The ``configDir`` will point to
the location of the configuration files. Mode describes whether Sheriff will perform the actions
on ``groups`` or ``resources``. The ``subscriptionId`` is the Azure subscription ID.

.. code:: yaml

  - name: Log in with Azure
      uses: azure/login@v1
      with:
        creds: '${{ secrets.AZURE_CREDENTIALS }}'

  - name: Sheriff Apply
    uses: gofrontier-com/sheriff-apply-action@initial-work
    with:
      configDir: config/resources
      mode: resources
      subscriptionId: '${{ secrets.SUBSCRIPTION_ID }}'

------------
Contributing
------------

We welcome contributions to this repository. Please see `CONTRIBUTING.md <https://github.com/gofrontier-com/sheriff-apply-action/tree/main/CONTRIBUTING.md>`_ for more information.
