import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Box, BaseCheckbox, Typography, Loader, Alert, Link, Flex, IconButton } from "@strapi/design-system";
import axios from "../utils/axiosInstance";
import { Pencil, Trash, Plus } from "@strapi/icons";
import ConfirmationDialog from "./ConfirmationDialog";
import BulkActions from "./BulkActions";
import { useIntl } from "react-intl";
import getTrad from "../utils/getTrad";

const COL_COUNT = 5;

const Repo = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false); //false by default
  const [selectedRepos, setSelectedRepos] = useState([]); //empty array by default
  const [alert, setAlert] = useState(undefined); //undefined by default
  const [deletingRepo, setDeletingRepo] = useState(undefined); //this will contain the projectId of the repo we're confimring delete on.
  const {formatMessage} = useIntl();

  const showAlert = (alert) => {
    setAlert(alert);
    //only have the alert last 5 seconds.
    setTimeout(() => setAlert(undefined), 5000);
  }

  const createProject = (repo) => {
    axios.post("/github-projects/project", repo).then((response) => {
      //update the repo with the projectId
      setRepos(
        repos.map((item) =>
          item.id !== repo.id
            ? item
            : {
                ...item,
                projectId: response.data.id,
              }
        )
      );
      showAlert({
        title: "Project Created",
        message: `Project ${response.data.title} created successfully`,
        variant: "success",
      });
    }).catch((error) => {
      showAlert({
        title: "Project Not Created",
        message: error.toString(),
        variant: "danger",
      });
    });    
  };

  const deleteProject = (repo) => {
    const { projectId } = repo;
    const response = axios.delete(`/github-projects/project/${projectId}`).then((response) => {
      if (response && response.data) {
        //update the repo with the projectId
        setRepos(
          repos.map((item) =>
            item.id !== repo.id
              ? item
              : {
                  ...item,
                  projectId: null,
                }
          )
        );
        showAlert({
          title: "Project Deleted",
          message: `Project ${response.data.title} deleted successfully`,
          variant: "success",
        });
      }
    }).catch((error) => {
      showAlert({
        title: "Project Not Deleted",
        message: `Project ${repo.title} not deleted`,
        variant: "danger",
      });
    });
  };

  const createAll = (reposToBecomeProjects) => {
    axios.post("/github-projects/projects", {
        repos: reposToBecomeProjects
    }).then((response) => {
    //make sure all projects are added
    if (response && response.data && response.data.length === reposToBecomeProjects.length) {
      //update the repo with the projectId
      setRepos(
        repos.map((repo) => {
          const relatedProjectJustCreated = response.data.find(
            (project) => project.repositoryId == repo.id
          );
          return !repo.projectId && relatedProjectJustCreated
            ? {
                ...repo,
                projectId: relatedProjectJustCreated.id,
              }
            : repo;
        })
      );

      showAlert({
        title: "Projects Created",
        message: `${response.data.length} Projects created successfully`,
        variant: "success",
      });
    } 
    }).catch((error) => {
        showAlert({
          title: "Projects Not Created",
          message: `At least one project wasn't created correctly.  Please try again.`,
          variant: "danger",
        });
    })
    .finally(() => {
      //reset the selction of checkboxes
        setSelectedRepos([]);
    });
    
    
  };

  const deleteAll = (projectIds) => {
    //axios delete does not accept a data payload, so we have to use the config property
    axios.delete("/github-projects/projects", {
      params: {
        projectIds,
      },
    }).then((response) => {
      //make sure all projects are added
      if (response && response.data && response.data.length === projectIds.length) {
        //update the repo with null projectId
        setRepos(
          repos.map((repo) => {
            const relatedProjectJustDeleted = response.data.find(
              (project) => project.repositoryId == repo.id
            );
            return repo.projectId && relatedProjectJustDeleted
              ? {
                  ...repo,
                  projectId: null,
                }
              : repo;
          })
        );
        showAlert({
          title: "Projects Deleted",
          message: `${response.data.length} Projects deleted successfully`,
          variant: "success",
        });
      }
    }).catch((error) => {    
      showAlert({
        title: "Projects Not Deleted",
        message: `At least one project wasn't deleted correctly.  Please try again.`,
        variant: "danger",
      });
    }).finally(() => {
      //reset the selction of checkboxes
      setSelectedRepos([]);
    });
  };

  const fetchData = async() => {
    setLoading(true);
    //fetch data from backend
    axios
      .get("/github-projects/repos")
      .then((response) => setRepos(response.data))
      .catch((error) => showAlert({
        title: "Error Fetching Repositories",
        message: error.toString(),
        variant: "danger",
      }));
    setLoading(false);
  }

  //first load of component and not each reload of interface
  useEffect(() => {
    fetchData();
  }, []); //array is what to re-execute if anything in inpit to this component change.  For example, [serverUrl, roomId]

  if (loading) return <Loader />; //if loading is true, display loader spinner

  //we have repos at this point
  const allChecked = selectedRepos.length === repos.length;
  const isIndeterminate = selectedRepos.length > 0 && !allChecked;

  return (
    <Box padding={8} background="neutral100">
      {deletingRepo && (
        <ConfirmationDialog
          visible={!!deletingRepo} // !== undefined
          message={`Are you sure you want to delete ${deletingRepo.title}?`}
          onClose={() => setDeletingRepo(undefined)} //close it and we don't have a repo to delete anymore
          onConfirm={() => {
            deleteProject(deletingRepo);
            setDeletingRepo(undefined);
          }}
        />
      )}
      {alert && (
        <div style={{ position: "absolute", top: 0, left: "14%", zIndex: 10 }}>
          <Alert
            closeLabel="Close alert"
            title={alert.title}
            variant={alert.variant}
          >
            {alert.message}
          </Alert>
        </div>
      )}
      {/* pass the entire repo to BulkActions */}
      {selectedRepos.length > 0 && (
        <BulkActions
          selectedRepos={selectedRepos.map((repoId) =>
            repos.find((repo) => repo.id == repoId)
          )}
          bulkCreateAction={createAll}
          bulkDeleteAction={deleteAll}
        />
      )}
      <Table colCount={COL_COUNT} rowCount={repos.length}>
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox
                aria-label="Select all entries"
                value={allChecked}
                indeterminate={isIndeterminate}
                // select all or unselect all
                onValueChange={(value) =>
                  value
                    ? setSelectedRepos(repos.map((repo) => repo.id))
                    : setSelectedRepos([])
                }
              />
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: getTrad("repo.name"),
                  defaultMessage: "Name",
                })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: getTrad("repo.description"),
                  defaultMessage: "Description",
                })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: getTrad("repo.url"),
                  defaultMessage: "Url",
                })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: getTrad("repo.actions"),
                  defaultMessage: "Actions",
                })}
              </Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {repos.map((repo) => {
            const { id, name, shortDescription, url, projectId } = repo;
            return (
              <Tr key={id}>
                <Td>
                  <BaseCheckbox
                    aria-label={`Select ${id}`}
                    value={selectedRepos.includes(id)}
                    onValueChange={(value) => {
                      if (value) {
                        setSelectedRepos([...selectedRepos, id]);
                      } else {
                        setSelectedRepos(
                          selectedRepos.filter((repoId) => repoId !== id)
                        );
                      }
                    }}
                  />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{name}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {shortDescription}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    <Link href={url} isexternal>
                      {url}
                    </Link>
                  </Typography>
                </Td>
                <Td>
                  {/* if projectId, show edit and delete; otherwise add */}
                  {projectId ? (
                    <Flex>
                      <Link
                        to={`/content-manager/collectionType/plugin::github-projects.project/${projectId}`}
                      >
                        <IconButton
                          onClick={() => console.log("edit")}
                          label="Edit"
                          noBorder
                          icon={<Pencil />}
                        />
                      </Link>

                      <Box paddingLeft={1}>
                        <IconButton
                          //   onClick={() => deleteProject(repo)}
                          onClick={() => setDeletingRepo(repo)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  ) : (
                    <IconButton
                      onClick={() => createProject(repo)}
                      label="Add"
                      noBorder
                      icon={<Plus />}
                    />
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Repo;
