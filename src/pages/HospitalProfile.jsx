import React from 'react';
import { Building2, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

const HospitalProfile = () => {
  // Sample data - you can pass this as props
  const hospitalData = {
    tenant_id: "06357d04-8e9a-4cb2-880a-4538490c1503",
    name: "Samyak Hospital",
    domain: "care@samyak.com",
    nin: null,
    address: null,
    is_active: true,
    created_at: "2025-08-31T18:56:16"
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const InfoItem = ({ icon: Icon, label, value, isStatus = false }) => {
    if (!value && value !== false) return null;
    
    return (
      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 border border-gray-100">
        <div className="flex-shrink-0 p-2 rounded-md bg-blue-50">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          {isStatus ? (
            <div className="flex items-center gap-2">
              {value ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700 font-medium">Active</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700 font-medium">Inactive</span>
                </>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-900 break-all">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto mx-auto p-6 bg-white rounded-xl  border border-gray-200">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-blue-50">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {hospitalData.name}
            </h1>
            <p className="text-sm text-gray-500">
              Hospital ID: {hospitalData.tenant_id.split('-')[0]}...
            </p>
          </div>
        </div>
      </div>

      {/* Profile Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem 
          icon={Building2} 
          label="Hospital Name" 
          value={hospitalData.name} 
        />
        
        <InfoItem 
          icon={Mail} 
          label="Contact Domain" 
          value={hospitalData.domain} 
        />
        
        <InfoItem 
          icon={Calendar} 
          label="Created Date" 
          value={formatDate(hospitalData.created_at)} 
        />
        
        <InfoItem 
          icon={CheckCircle} 
          label="Status" 
          value={hospitalData.is_active}
          isStatus={true}
        />
      </div>

      {/* Empty State for Future Fields */}
      <div className="mt-8 p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30">
        <div className="text-center">
          <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-1">Additional Information</p>
          <p className="text-xs text-gray-400">
            More profile details will appear here when available
          </p>
        </div>
      </div>

      {/* Technical Details - Collapsible */}
      <details className="mt-6 group">
        <summary className="flex items-center justify-between p-4 bg-blue-50/30 rounded-lg cursor-pointer hover:bg-blue-50/50 transition-colors">
          <span className="text-sm font-medium text-gray-700">Technical Details</span>
          <span className="text-xs text-gray-500 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="mt-3 p-4 bg-white rounded-lg border border-gray-100">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Tenant ID:</span>
              <span className="font-mono text-gray-700 break-all">{hospitalData.tenant_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Created:</span>
              <span className="font-mono text-gray-700">{hospitalData.created_at}</span>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default HospitalProfile;