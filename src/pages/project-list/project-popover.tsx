// Components
import { Link } from "react-router-dom";
import { Popover, List, Collapse, Button } from "antd";
import styled from "@emotion/styled";

// Hooks
import { useGetProject } from "page-hooks/project";

const ProjectPopover = () => {
  const { response: projects } = useGetProject();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Collapse ghost defaultActiveKey="shortcuts">
        <Collapse.Panel header="收藏的项目" key="pinProjects">
          <List size="small">
            {pinnedProjects?.map((project) => (
              <List.Item key={project.id}>
                <PinProjectListItem to={`/projects/${project.id}`}>
                  {project.name}
                </PinProjectListItem>
              </List.Item>
            ))}
          </List>
        </Collapse.Panel>
        <Collapse.Panel header="快捷操作" key="shortcuts">
          <Button type="link">新建项目</Button>
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
`;

const PinProjectListItem = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
`;

export default ProjectPopover;
