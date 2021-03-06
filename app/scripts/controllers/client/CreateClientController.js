(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientController: function(scope, resourceFactory, location) {
        scope.offices = [];
        scope.staffs = [];
        scope.formData = {
          active :'true'
        }
        resourceFactory.clientTemplateResource.get(function(data) {
            scope.offices = data.officeOptions;
            scope.staffs = data.staffOptions;
            scope.formData.officeId = scope.offices[0].id;
        });
        
         scope.changeOffice =function(officeId) {
          resourceFactory.clientTemplateResource.get({staffInSelectedOfficeOnly : false, officeId : officeId
              }, function(data) {
            scope.staffs = data.staffOptions;
          });
        }
        scope.submit = function() {  
            this.formData.locale = 'en';
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = '05 August 2013';
            resourceFactory.clientResource.save(this.formData,function(data){
            location.path('/viewclient/' + data.resourceId);
            
          });
          };
    }
  });
  mifosX.ng.application.controller('CreateClientController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateClientController]).run(function($log) {
    $log.info("CreateClientController initialized");
  });
}(mifosX.controllers || {}));
