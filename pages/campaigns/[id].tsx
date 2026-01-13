import React from 'react';
import { useRouter } from 'next/router';
import CampaignDetail from '../../components/ClusterModule/CampaignDetail';

export default function CampaignDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm" style={{ color: '#DC2626' }}>ID de campaña no válido</div>
      </div>
    );
  }

  return (
    <CampaignDetail
      campaignId={id}
      onEdit={() => {
        router.push(`/campaigns/${id}/edit`);
      }}
      onBack={() => {
        router.push('/campaigns');
      }}
    />
  );
}

