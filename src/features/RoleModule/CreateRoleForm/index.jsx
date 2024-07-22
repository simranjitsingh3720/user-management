import { Grid, CardContent, Card, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useRole from '../hooks/useRole';
import useGetGroup from '../hooks/useGetGroup';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import InputField from '../../../components/CustomTextfield';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';

function CreateRoleForm() {
  const { id } = useParams();
  const { groupData, loading: groupLoading } = useGetGroup();
  const { roleData, fetchRoleById, createRole, updateRole, loading } = useRole();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: '',
      groups: null,
    },
  });

  const onSubmit = (data) => {
    const { roleName, groups } = data;

    if (id) {
      updateRole(id, {
        groupId: groups?.id,
      });
    } else {
      createRole({
        roleName,
        groupId: groups?.id,
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchRoleById(id);
    }
  }, [id]);

  useEffect(() => {
    if (roleData && !loading) {
      setValue('roleName', roleData?.roleName || '');
      setValue('groups', roleData?.group || null);
    }
  }, [roleData, loading, setValue]);

  const handleReset = () => {
    if (id) {
      setValue('groups', null);
    } else {
      setValue('roleName', '');
      setValue('groups', null);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <CustomFormHeader
            id={id}
            headerText={FORM_HEADER_TEXT.ROLE}
            navigateRoute="/roles"
            handleReset={handleReset}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputField
                id="roleName"
                required
                label="Role Name"
                validation={{ required: 'Role Name is required' }}
                control={control}
                errors={errors}
                classes="w-full"
                disabled={id ? true : false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomAutoCompleteWithoutCheckbox
                name="groups"
                label="Group Name"
                required={true}
                options={groupData || []}
                loading={groupLoading}
                getOptionLabel={(option) => option?.groupName?.toUpperCase() || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'Group is required' }}
                error={Boolean(errors.groups)}
                helperText={errors.groups?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.groupName?.toUpperCase()}
                  </li>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={loading}>
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </div>
    </Box>
  );
}

export default CreateRoleForm;
