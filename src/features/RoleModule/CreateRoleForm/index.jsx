import { Autocomplete, Grid, TextField, CircularProgress, CardContent, Card, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useGetGroup from '../hooks/useGetGroup';
import useCreateRole from '../hooks/useCreateRole';
import useGetRoleById from '../hooks/useGetRoleByID';
import useUpdateRole from '../hooks/useUpdateRole';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';

const convertToDesiredFormat = (data, roleName) => {
  const groupId = data.id;
  return { groupId, roleName };
};

const convertUpdateFormat = (data) => {
  return { roleName: data.roleName, groupId: data.groups.id };
};

function CreateRoleForm() {
  const { id } = useParams();

  const { loading: roleUpdateLoading, data: roleData, fetchData } = useGetRoleById();

  const { data: allGroupData } = useGetGroup();

  const { UpdateDataFun, updateLoading } = useUpdateRole(id);

  const { postData, loading } = useCreateRole();

  const onSubmit = (data) => {
    if (id) {
      const result = convertUpdateFormat(data);
      UpdateDataFun(result);
    } else {
      const result = convertToDesiredFormat(data.groups, data.roleName);
      postData(result);
    }
  };

  const { handleSubmit, control, setValue, formState, getValues } = useForm({
    defaultValues: { roleName: '', groups: {} },
  });

  const { errors } = formState;

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (roleData) {
      setValue('roleName', roleData?.data?.roleName);
      setValue('groups', roleData?.data?.group || {});
    }
  }, [roleData]);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <CustomFormHeader id={id} headerText={FORM_HEADER_TEXT.ROLE} navigateRoute="/roles" />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
              <span className="text-gray-600 text-sm required-field">Role Name</span>
                <Controller
                  name="roleName"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Role Name is required' }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Enter Name"
                      size="small"
                      fullWidth
                      {...field}
                      error={!!errors.roleName}
                      helperText={errors.roleName ? errors.roleName.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-gray-600 text-sm required-field">Group Name</span>
                <Controller
                  name="groups"
                  control={control}
                  rules={{ required: 'Group Name is required' }}
                  render={({ field }) => (
                    <Autocomplete
                      value={getValues('groups') || {}}
                      options={allGroupData?.data || []}
                      getOptionLabel={(option) => option?.groupName?.toUpperCase() || ''}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select"
                          size="small"
                          error={!!errors.groups}
                          helperText={errors.groups ? errors.groups.message : ''}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <div className="mt-4">
          <CustomButton
            type="submit"
            variant="contained"
            disabled={loading || (id && roleUpdateLoading) || updateLoading}
          >
            {id ? 'Update' : 'Submit'}
          </CustomButton>
        </div>
      </Box>
    </>
  );
}

export default CreateRoleForm;
