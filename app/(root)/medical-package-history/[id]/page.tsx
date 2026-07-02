import { InfoGrid } from "@/components/common/Info-grid";
import { MedicalPackageHistoryCta } from "@/features/medical-package-history/components/medical-package-history-cta";
import { MedicalRecordView } from "@/features/medical-records/components/medical-record-view";
import { PrescriptionView } from "@/features/prescriptions/components/prescription-view";
import { api } from "@/lib/api/api";
import { PACKAGE_STATUS } from "@/lib/api/types/user-package";
import { formatCurrency } from "@/lib/currency-formatter";
import { formatDate } from "@/lib/date";
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";

interface MedicalPackageHistoryDetailProps {
  params: Promise<{ id: string }>;
}

// Helper to render status badges dynamically
const getStatusBadge = (status: string) => {
  const baseClasses =
    "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit";
  switch (status) {
    case PACKAGE_STATUS.PURCHASED:
      return (
        <span className={`${baseClasses} bg-green-100 text-green-700`}>
          <CheckCircle className="w-3.5 h-3.5" /> Purchased
        </span>
      );
    case PACKAGE_STATUS.USED:
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
          <Activity className="w-3.5 h-3.5" /> Used
        </span>
      );
    case PACKAGE_STATUS.PENDING:
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
          <Clock className="w-3.5 h-3.5" /> Pending Approval
        </span>
      );
    case PACKAGE_STATUS.EXPIRED:
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-600`}>
          <AlertCircle className="w-3.5 h-3.5" /> Expired
        </span>
      );
    case PACKAGE_STATUS.REFUNDED:
      return (
        <span className={`${baseClasses} bg-red-100 text-red-700`}>
          <XCircle className="w-3.5 h-3.5" /> Refunded
        </span>
      );
    case PACKAGE_STATUS.REJECTED:
      return (
        <span className={`${baseClasses} bg-red-100 text-red-700`}>
          <XCircle className="w-3.5 h-3.5" /> Rejected
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
          {status}
        </span>
      );
  }
};

const MedicalPackageHistoryDetail = async ({
  params,
}: MedicalPackageHistoryDetailProps) => {
  const { id } = await params;
  const { data: userPackage } = await api.userPackage.getById(id);

  if (!userPackage) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Medical package record not found.
      </div>
    );
  }

  const { package: medPackage, patient, medicalRecord } = userPackage;

  return (
    <div className="p-6 space-y-6  min-h-screen">
      <div className="bg-card p-6 rounded-xl border  shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Package ID: {userPackage.id}
          </span>
          <h1 className="text-2xl font-bold  mt-1">
            {medPackage?.name || "Medical Package"}
          </h1>
          <p>{formatCurrency(userPackage.purchasedPrice)}</p>
          <p className="text-muted-foreground text-sm mt-1">
            {medPackage?.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(userPackage.status)}
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-4 4-4" /> Purchased:{" "}
            {formatDate(userPackage.purchaseDate) || "N/A"}
          </div>
        </div>
      </div>

      <MedicalPackageHistoryCta userPackage={userPackage} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <InfoGrid
            title="Patient Details"
            columns={1}
            options={[
              {
                label: "Full Name",
                value: patient?.name || "N/A",
              },
              {
                label: "Email",
                value: patient?.email || "N/A",
              },
            ]}
          />
          <InfoGrid
            title="Transaction Details"
            columns={2}
            options={[
              {
                label: "Price Paid",
                value: userPackage.purchasedPrice
                  ? formatCurrency(userPackage.purchasedPrice)
                  : "N/A",
              },

              {
                label: "Expiry Date",
                value: userPackage.expiryDate
                  ? formatDate(userPackage.expiryDate)
                  : "N/A",
              },
            ]}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {medicalRecord ? (
            <div>
              <MedicalRecordView data={medicalRecord} />
              {medicalRecord?.prescriptions && (
                <PrescriptionView
                  data={medicalRecord.prescriptions}
                  medicalRecordId={medicalRecord.id}
                />
              )}
            </div>
          ) : (
            <div className="bg-card p-8 rounded-xl border  shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-muted-foreground">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-md font-semibold ">No Medical Record Yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Once the patient redeems this package and undergoes an
                appointment assessment, the clinical notes and diagnosis will
                appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalPackageHistoryDetail;
