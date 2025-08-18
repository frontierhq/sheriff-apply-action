.. image:: logo.png
  :width: 200
  :alt: Sheriff logo
  :align: center

====================
Sheriff Apply Action
====================

-----
About
-----

This is a Github Action that provides an interface to the ``apply`` action for
`Sheriff <https://github.com/frontierhq/sheriff>`_, a command line tool to
manage Microsoft Entra Privileged Identity Management (Microsoft Entra PIM)
using desired state configuration.

-----
Usage
-----

This task runs the apply action of Sheriff CLI on the agent. The ``configDir`` input will point to
the location of the configuration files. The ``mode`` input describes whether Sheriff will perform the actions
on ``groups``, ``resources`` or ``entra``. The ``planOnly`` input runs only the Sheriff plan without applying changes. The ``auto-approve`` input automatically approves changes without manual confirmation (default: true). The ``subscriptionId`` is the Azure subscription ID. The ``tenantId`` input is the Azure tenant ID.
The ``clientId`` and ``clientSecret`` inputs are used for authentication with Azure. The ``authscheme`` input is used to specify the authentication scheme, which can be either ``federated`` (OIDC) or ``sp`` (Service Principle).

The Sheriff action ``sheriff-apply-action`` include built-in authentication logic. It supports both Service Principal and Federated Identity (OIDC) authentication schemes and will log in to Azure automatically based on the inputs provided (clientId, tenantId, clientSecret, authScheme, etc.).
Because authentication is handled internally by the Sheriff action, you do not need to add a separate azure/login step in your workflow.

.. code:: yaml

  steps:
    - name: Setup Sheriff
      uses: frontierhq/sheriff-setup-action@v1

    - name: Sheriff Apply
      uses: frontierhq/sheriff-apply-action@v1
      with:
        configDir: config/resources
        mode: resources
        planOnly: false
        autoApprove: true
        subscriptionId: '${{ secrets.SUBSCRIPTION_ID }}'
        tenantId: '${{ secrets.TENANT_ID }}'
        clientId: '${{ secrets.CLIENT_ID }}'
        clientSecret: '${{ secrets.CLIENT_SECRET }}'
        authscheme: '${{ secrets.AUTHSCHEME }}'

------------
Input Parameters
------------

+----------------+-----------+----------------------------------------------------------------------------------------------+
| Name           | Required  | Description                                                                                  |
+================+===========+==============================================================================================+
| configDir      | Yes       | Path to the Sheriff configuration directory.                                                 |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| mode           | Yes       | Mode defines whether plan will action on `groups`, `resources` or `entra`.                   |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| planOnly       | Optional  | (default: false) If true, only the plan will be executed without making any changes.         |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| autoApprove    | Optional  | (default: true) If true, automatic approval will be granted without manual confirmation.     |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| subscriptionId | Yes       | Azure subscription ID to target.                                                             |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| authScheme     | Optional  | (defaults: federated) Allowed values are `federated` or `sp`.                                |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| clientId       | Yes*      | Application (client) ID of the Service Principal. Required for both federated and sp schemes.|
+----------------+-----------+----------------------------------------------------------------------------------------------+
| tenantId       | Yes*      | Azure AD tenant ID. Required for both federated and sp schemes.                              |
+----------------+-----------+----------------------------------------------------------------------------------------------+
| clientSecret   | Yes (sp)  | Service Principal client secret. Required only if authScheme is sp.                          |
+----------------+-----------+----------------------------------------------------------------------------------------------+

Note:
 * For `federated`, `clientId` and `tenantId` are required, but `clientSecret` is **not**.
 * For `sp`, `clientId`, `tenantId`, and `clientSecret` are required.
 
------------
Contributing
------------

We welcome contributions to this repository. Please see `CONTRIBUTING.md <https://github.com/frontierhq/sheriff-apply-action/tree/main/CONTRIBUTING.md>`_ for more information.
