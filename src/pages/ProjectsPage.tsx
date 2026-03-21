import Card from '../components/Card'
import Section from '../components/Section'
import { projects } from '../data/projects'
import styles from './Page.module.css'

function ProjectsPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Projects</h1>
        <p>
          Strategic initiatives that strengthen licensing services and
          regulatory oversight.
        </p>
      </section>

      <Section title="Active and Planned Projects">
        <div className={styles.gridThree}>
          {projects.map((project) => (
            <Card key={project.id} title={project.title}>
              <p className={styles.muted}>{project.summary}</p>
              <p>
                <strong>Status:</strong> {project.status}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

export default ProjectsPage
