import React, {useState} from "react";
import { Box, Button, Flex, Typography } from "@strapi/design-system";
import ConfirmationDialog from "./ConfirmationDialog";

const BulkActions = ({ selectedRepos, bulkCreateAction, bulkDeleteAction }) => {
  // distinguish those with projectId's and not
  const reposWithoutProject = selectedRepos.filter((repo) => !repo.projectId);
  const reposWithProject = selectedRepos.filter((repo) => repo.projectId);
  const projectsToBeCreate = reposWithoutProject.length;
  const projectsToBeDeleted = reposWithProject.length;
  const projectIdsToDeleted = reposWithProject.map((repo) => repo.projectId);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  return (
    <Box paddingBottom={4}>
      <Flex>
        <Typography>
          {`You have ${projectsToBeCreate} projects to generate and ${projectsToBeDeleted} to delete`}
        </Typography>
        {projectsToBeCreate > 0 && (
          <Box paddingLeft={2}>
            <Button
              size="S"
              variant="success-light"
              onClick={() => bulkCreateAction(reposWithoutProject)}
            >
              {`Create ${projectsToBeCreate} projects`}
            </Button>
          </Box>
        )}
        {projectsToBeDeleted > 0 && (
          <Box paddingLeft={2}>
            <Button
              size="S"
              variant="danger-light"
              onClick={() => setDialogVisible(true)}
            >
              {`Delete ${projectsToBeDeleted} projects`}
            </Button>
          </Box>
        )}
      </Flex>
      <ConfirmationDialog
            visible={dialogVisible}
            message="Are you sure you want to delete these projects?"
            onClose={() => setDialogVisible(false)}
            onConfirm={() => {
                bulkDeleteAction(projectIdsToDeleted)
                setDialogVisible(false);
            }}
        />
    </Box>
  );
};

export default BulkActions;