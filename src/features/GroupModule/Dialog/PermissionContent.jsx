import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupById } from '../../../stores/slices/groupSlice';
import CustomTable from '../../../components/CustomTable';
import { PermissionHeader } from '../utils/PermissionHeader';

const PermissionContent = ({ data }) => {
  const dispatch = useDispatch();
  const { groupPermission, groupPermissionLoading } = useSelector((state) => state.group);
  const [ permissionData, setPermissionData ] = useState([]);

  const header = useMemo(() => PermissionHeader(), []);

  useEffect(() => {
    dispatch(getGroupById(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (groupPermission?.data === undefined) return;

    const transformedData = groupPermission?.data?.permissions?.map((item) => {
      return {
        id: item.id,
        permissionName: item.permissionName,
        permissionType: item.permissionType,
        permissionStatus: item.status ? 'Active' : 'Inactive',
      };
    }) || [];

    setPermissionData(transformedData);
  }, [groupPermission]);

  return (
    <div className='mt-4'>
      <CustomTable
        rows={permissionData || []}
        columns={header}
        loading={groupPermissionLoading}
        hideFooter={true}
      />
    </div>
  );
};

export default PermissionContent;
