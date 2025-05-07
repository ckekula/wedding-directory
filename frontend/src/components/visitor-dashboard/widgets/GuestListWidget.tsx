import React from "react";
import { Users } from "lucide-react";
import ActionButton from "../common/ActionButton";
import EmptyStateDisplay from "../common/EmptyStateDisplay";

interface GuestListWidgetProps {
  attendingGuests: number;
  declinedGuests: number;
  invitedGuests: number;
  notInvitedGuests: number;
  totalGuests: number;
}

const GuestListWidget: React.FC<GuestListWidgetProps> = ({
  attendingGuests,
  declinedGuests,
  invitedGuests,
  notInvitedGuests,
  totalGuests,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-100">
        <h3 className="text-xl font-title font-semibold flex items-center text-gray-800">
          <Users className="mr-3 h-5 w-5 text-orange-500" />
          Guest List
        </h3>
      </div>
      <div className="p-6 font-body font-normal">
        <p className="text-gray-600 mb-5">
          Manage your wedding guest list with {totalGuests || 0} total guests
          across all categories.
        </p>

        {totalGuests > 0 ? (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {/* Attending guests */}
            <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100 shadow-sm">
              <p className="font-bold text-green-600 text-lg mb-1">
                {attendingGuests || 0}
              </p>
              <p className="text-xs text-gray-600">Attending</p>
            </div>

            {/* Declined guests */}
            <div className="bg-red-50 rounded-lg p-3 text-center border border-red-100 shadow-sm">
              <p className="font-bold text-red-500 text-lg mb-1">
                {declinedGuests || 0}
              </p>
              <p className="text-xs text-gray-600">Declined</p>
            </div>

            {/* Invited guests */}
            <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100 shadow-sm">
              <p className="font-bold text-orange-500 text-lg mb-1">
                {invitedGuests || 0}
              </p>
              <p className="text-xs text-gray-600">Invited</p>
            </div>

            {/* Not Invited guests */}
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-500 text-lg mb-1">
                {notInvitedGuests || 0}
              </p>
              <p className="text-xs text-gray-600">Not Invited</p>
            </div>
          </div>
        ) : (
          <EmptyStateDisplay Icon={Users} message="No guests added yet" />
        )}

        <ActionButton
          href="/guest-list"
          label="Manage guest list"
        />
      </div>
    </div>
  );
};

export default GuestListWidget;
