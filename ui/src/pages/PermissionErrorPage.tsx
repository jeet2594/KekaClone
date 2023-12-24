import React from 'react';

const PermissionErrorPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  return (
    <div style={containerStyle} className="permission-error-container">
      <div style={contentStyle} className="permission-error-content">
        <h2>Permission Denied</h2>
        <p>You do not have permission to view this page.</p>
        {/* You can add more content or styling here */}
      </div>
    </div>
  );
};

export default PermissionErrorPage;
