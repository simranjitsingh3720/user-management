import { IconButton, TextField, FormControlLabel, Checkbox, Tooltip, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Controller, useForm } from 'react-hook-form';
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
import { FORM_HEADER_TEXT } from '../../../utils/constants';
import useDebounce from '../../../hooks/useDebounce';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { STATUS } from '../constants';

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
  const [input, setInput] = useState('');
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
  const { handleSubmit, control, setValue, formState, getValues } = useForm({
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
    setValue('groupName', '');
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
    <div>
      {' '}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className="p-5">
            <CustomFormHeader
              id={id}
              headerText={FORM_HEADER_TEXT.GROUP}
              navigateRoute="/group"
              handleReset={handleReset}
            />
          </div>
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Group Name <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="groupName"
                control={control}
                defaultValue=""
                rules={{ required: 'Group Name is required' }}
                render={({ field }) => (
                  <TextField
                    id="groupName"
                    variant="outlined"
                    placeholder="Enter Name"
                    size="small"
                    className={styles.customizeSelect}
                    {...field}
                    value={field?.value}
                    onChange={(e) => {
                      setValue('groupName', e.target.value);
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>{errors.groupName && <span>{errors.groupName.message}</span>} </div>
            </div>
            {/* <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Group Status <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="groupStatus"
                control={control}
                defaultValue={id ? (groupData?.data?.status ? 'active' : 'inactive') : 'active'}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="insillion-status-row-radio-buttons-group-label"
                    name="groupStatus"
                    {...field}
                  >
                    <FormControlLabel value="active" control={<Radio />} label="Active" className={styles.radioStyle} />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                )}
              />
              <div className={styles.styledError}>{errors.groupStatus && <span>This field is required</span>} </div>
            </div> */}
            <div className={styles.fieldContainerStyle}>
              <UserTypeToggle
                menuItem={STATUS}
                label="Status"
                required={true}
                control={control}
                name="groupStatus"
                defaultValue="active"
              />
            </div>
          </div>
          <div className={styles.fieldContainerStyle}>
            <span className={styles.labelText}>Group User</span>
            <Controller
              name="groupUser"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  id="groupUser"
                  value={getValues('groupUser')}
                  options={userData || []}
                  disableCloseOnSelect
                  getOptionLabel={(option) => {
                    return option?.lastName ? `${option?.firstName} ${option?.lastName}` : option?.firstName;
                  }}
                  limitTags={5}
                  className={styles.customizePrivilegeSelect}
                  size="small"
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} placeholder="Select" />}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: '200px',
                    },
                  }}
                  onInputChange={(event, val) => {
                    setInput(val);
                  }}
                />
              )}
            />
          </div>
          <div className={styles.fieldContainerStyle}>
            <span className={styles.labelText}>
              Permissions <span className={styles.styledRequired}>*</span>
            </span>
            <div className={styles.permissionContainer}>
              <div className={styles.permissionSelect}>
                <div className={styles.permissionInnerSelect}>
                  {' '}
                  {(checkedPermission || []).map((item) => {
                    return (
                      item.checked && (
                        <div className={styles.permissionSelectButton}>
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
              <div className={styles.permissionCheckbox}>
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
                <div className="flex content-start w-full items-center pl-7 pb-3">
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
                <div className={styles.permissionCheckbox}>
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
            <div className={styles.styledError}>
              {permissionError && <span>At least one permission is required</span>}
            </div>
          </div>
        </div>
        <CustomButton
          type="submit"
          variant="contained"
          disabled={loading || (id && GroupUpdateLoading) || updateLoading}
        >
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </form>
    </div>
  );
}

export default CreateGroupForm;
