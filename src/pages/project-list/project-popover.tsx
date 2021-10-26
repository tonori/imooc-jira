// Components
import { Link } from "react-router-dom";
import { Collapse, List, Popover } from "antd";
import styled from "@emotion/styled";

// Hooks
import { useProjectCURD } from "page-hooks/project";

const ProjectPopover = () => {
  const { useGetItem: useGetProject } = useProjectCURD();
  const { data: projects } = useGetProject();
  const pinnedProjects = projects?.filter((project) => project.pin) || [];
  const hasPinnedProjects = Boolean(pinnedProjects && pinnedProjects.length);

  const content = (
    <ContentContainer>
      <Collapse ghost defaultActiveKey="shortcuts">
        <Collapse.Panel
          header="收藏的项目"
          key="pinProjects"
          collapsible={hasPinnedProjects ? "header" : "disabled"}
        >
          <List size="small">
            {pinnedProjects.map((project) => (
              <List.Item key={project.id}>
                <PinProjectListItem to={`/projects/${project.id}`}>
                  {project.name}
                </PinProjectListItem>
              </List.Item>
            ))}
          </List>
        </Collapse.Panel>
        <Collapse.Panel header="快捷操作" key="shortcuts">
          <Link className="shortcuts-link" to="/projects/create-project">
            新建项目
          </Link>
        </Collapse.Panel>
      </Collapse>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 20rem;

  .ant-collapse .ant-collapse-item:not(:last-child) {
    margin-bottom: 1rem !important;
  }

  .ant-collapse-header {
    padding: 0 !important;
    color: #777 !important;
  }

  .ant-collapse-content-box {
    padding: 10px 0 !important;
  }

  .ant-divider-inner-text {
    color: #777 !important;
  }

  .shortcuts-link {
    padding: 0 16px;
  }
`;

const PinProjectListItem = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
`;

export default ProjectPopover;
