import {
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Box,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useGetPermission from '../hooks/useGetPermission';
import useCreateGroup from '../hooks/useCreateGroup';
import useGetGroupById from '../hooks/useGetGroupByID';
import useUpdateGroup from '../hooks/useUpdateGroup';
import CloseIcon from '@mui/icons-material/Close';
import ListLoader from '../../../components/ListLoader';
import NoDataFound from '../../../components/NoDataCard';
import useGetUser from '../hooks/useGetUser';
import useUpdateUser from '../hooks/useUpdateUser';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import useDebounce from '../../../hooks/useDebounce';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { STATUS } from '../constants';
import InputField from '../../../components/CustomTextfield';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';

const convertToDesiredFormat = (data, groupName, groupStatus) => {
  const permissions = data?.map((permission) => permission.id);
  const status = groupStatus === 'active' ? true : false;
  return { permissions, groupName, status };
};

const convertUpdateFormat = (newData, oldData) => {
  const newDataIds = new Set(newData?.map((obj) => obj.id));

  const dataIds = new Set(oldData?.map((obj) => obj.id));

  // Finding added permissions
  const add = [...newDataIds].filter((id) => !dataIds.has(id));

  // Finding removed permissions
  const remove = [...dataIds].filter((id) => !newDataIds.has(id));

  return { add, remove };
};

function CreateGroupForm() {
  const [input] = useState('');
  const [query, setQuery] = useState('');
  const debouncedInput = useDebounce(input, 500);
  const [filteredPermission, setFilteredPermission] = useState([]);
  const { userData } = useGetUser(debouncedInput);
  const [selectAll, setSelectAll] = useState(false);

  const { permissionData, permissionLoading } = useGetPermission();

  const [checkedPermission, setCheckedPermission] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    if (permissionData && permissionData?.data) {
      const sortedData = permissionData.data.sort((a, b) => a.permissionName.localeCompare(b.permissionName));
      setCheckedPermission(sortedData || []);
      setFilteredPermission(sortedData || []);
    }
  }, [permissionData]);

  const { id } = useParams();

  const { loading: GroupUpdateLoading, data: groupData, fetchData } = useGetGroupById();

  const { UpdateDataFun, updateLoading } = useUpdateGroup();

  const { userPostData } = useUpdateUser();

  const { postData, loading } = useCreateGroup();
  const { handleSubmit, control, setValue, formState, trigger } = useForm({
    defaultValues: { groupName: '', groupStatus: 'active', groupUser: [] },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const selectedPermissions = checkedPermission.filter((item) => item.checked === true);
    if (selectedPermissions.length === 0) {
      setPermissionError(true);
      return;
    }
    if (id) {
      const selectPermissions = checkedPermission.filter((item) => item.checked === true);
      const result = convertUpdateFormat(selectPermissions, groupData?.data?.permissions);

      const resultUser = convertUpdateFormat(data?.groupUser, groupData?.data?.users);

      const userUpdatePayload = {
        addUsers: resultUser.add,
        removeUsers: resultUser.remove,
        id: id,
      };

      const payload = {
        addPermissions: result.add,
        removePermissions: result.remove,
        properties: {
          groupName: data.groupName,
          status: data.groupStatus === 'active' ? true : false,
        },
        id: id,
      };
      userPostData(userUpdatePayload);
      UpdateDataFun(payload);
    } else {
      const selectPermissions = checkedPermission.filter((item) => item.checked === true);

      const result = convertToDesiredFormat(selectPermissions, data.groupName, data.groupStatus);
      postData(result, data.groupUser);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (groupData) {
      setValue('groupName', groupData?.data?.groupName);
      setValue('groupUser', groupData?.data?.users || []);
      setValue('groupStatus', groupData?.data?.status ? 'active' : 'inactive');
      if (permissionData && permissionData?.data) {
        setCheckedPermission((prev) => {
          const newCheckedPermission = [...prev];
          newCheckedPermission.forEach((permissionElement) =>
            (groupData?.data?.permissions || []).forEach((groupEle) => {
              if (groupEle.id === permissionElement.id) {
                permissionElement.checked = true;
                return;
              }
            })
          );
          return newCheckedPermission;
        });
        setFilteredPermission((prev) => {
          const newFilteredPermission = [...prev];
          newFilteredPermission.forEach((permissionElement) =>
            (groupData?.data?.permissions || []).forEach((groupEle) => {
              if (groupEle.id === permissionElement.id) {
                permissionElement.checked = true;
                return;
              }
            })
          );
          return newFilteredPermission;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupData, permissionData]);

  const areAllPermissionsSelected = (permissions) => {
    return permissions.length > 0 && permissions.every((permission) => permission.checked);
  };

  const handleChange = (item) => {
    const newPermissions = checkedPermission.map((permission) => {
      if (permission.id === item.id) {
        const updatedItem = { ...permission, checked: !permission.checked };
        return updatedItem;
      }
      return permission;
    });

    setCheckedPermission(newPermissions);
    setFilteredPermission(newPermissions);
    setSelectAll(areAllPermissionsSelected(newPermissions));
    if (newPermissions.some((permission) => permission.checked)) {
      setPermissionError(false);
    }
  };

  useEffect(() => {
    setSelectAll(areAllPermissionsSelected(checkedPermission));
  }, [checkedPermission]);

  useEffect(() => {
    if (query === '') {
      setFilteredPermission(checkedPermission);
    } else {
      const filteredData = checkedPermission.filter((item) =>
        item.permissionName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPermission(filteredData);
    }
  }, [query, checkedPermission]);

  const handleSelectAll = () => {
    const newPermissions = checkedPermission.map((permission) => ({
      ...permission,
      checked: !selectAll,
    }));
    setCheckedPermission(newPermissions);
    setFilteredPermission(newPermissions);
    setSelectAll(!selectAll);
    if (newPermissions.some((permission) => permission.checked)) {
      setPermissionError(false);
    }
  };

  const handleReset = () => {
    if (!id) {
      setValue('groupName', '');
    }
    setValue('groupUser', []);
    setValue('groupStatus', 'active');
    const resetPermissions = checkedPermission.map((permission) => ({
      ...permission,
      checked: false,
    }));

    setCheckedPermission(resetPermissions);
    setFilteredPermission(resetPermissions);
    setSelectAll(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomFormHeader
                id={id}
                headerText={FORM_HEADER_TEXT.GROUP}
                navigateRoute="/group"
                handleReset={handleReset}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <InputField
                id="groupName"
                required={true}
                label="Group Name"
                control={control}
                errors={errors}
                placeholder="Enter Name"
                rules={{ required: 'Group Name is required' }}
                trigger={trigger}
                disabled={id ? true : false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <UserTypeToggle
                menuItem={STATUS}
                label="Status"
                required={true}
                control={control}
                name="groupStatus"
                defaultValue="active"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomAutoCompleteWithoutCheckbox
                name="groupUser"
                label="Group User"
                control={control}
                multiple
                options={userData || []}
                getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                limitTags={2}
              />
            </Grid>
            <Grid item xs={12}>
              <span className="required-field label-text">Permissions</span>
              <div className="flex max-h-[30rem]">
                <div className="overflow-y-auto w-full p-4 border border-blueHaze rounded-l-lg">
                  <div className="flex flex-wrap h-fit">
                    {(checkedPermission || []).map((item) => {
                      return (
                        item.checked && (
                          <div className={styles.permissionSelectButton} key={item.id}>
                            {item.permissionName.length > 25 ? (
                              <Tooltip title={item.permissionName}>
                                <span className={styles.permissionNameStyle}>{`${item.permissionName.substring(
                                  0,
                                  25
                                )}...`}</span>
                              </Tooltip>
                            ) : (
                              <span className={styles.permissionNameStyle}>{item.permissionName || ''}</span>
                            )}
                            <div className={styles.crossIconStyle}>
                              <IconButton
                                aria-label="back"
                                onClick={() => {
                                  handleChange(item);
                                }}
                                size="small"
                              >
                                <CloseIcon color="primary" fontSize="inherit" />
                              </IconButton>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
                <div className="overflow-y-auto w-full p-4 border border-blueHaze rounded-r-lg">
                  <TextField
                    id="search"
                    variant="outlined"
                    placeholder="Search by permission name"
                    size="small"
                    className={styles.textFieldStyle}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                  <div className="flex content-start w-full items-center pl-8 pb-3">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                          inputProps={{ 'aria-label': 'select all permissions' }}
                        />
                      }
                      label="Select All"
                    />
                  </div>
                  <div className="overflow-y-auto w-full py-4 px-8 border border-blueHaze rounded-lg">
                    {permissionLoading ? (
                      <ListLoader rows={5} column={3} />
                    ) : filteredPermission.length ? (
                      (filteredPermission || []).map((item) => (
                        <div className={styles.checkboxStyle} key={item.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!item.checked}
                                onChange={() => handleChange(item)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            }
                            label={
                              item.permissionName.length > 20 ? (
                                <Tooltip title={item.permissionName}>
                                  <span className={styles.permissionNameStyle}>{`${item.permissionName.substring(
                                    0,
                                    20
                                  )}...`}</span>
                                </Tooltip>
                              ) : (
                                <span className={styles.permissionNameStyle}>{item.permissionName || ''}</span>
                              )
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-custom-red text-sm mt-2">
                {permissionError && <span>At least one permission is required</span>}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton
          type="submit"
          variant="contained"
          disabled={loading || (id && GroupUpdateLoading) || updateLoading}
          loading={loading || (id && GroupUpdateLoading) || updateLoading}
        >
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </div>
    </Box>
  );
}

export default CreateGroupForm;
