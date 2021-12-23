import got from 'got'


export default async (req, res) => {

  const query = `{
    search(query: "${req.body.repositories}" type: REPOSITORY first: 10) {
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
      nodes {
        ... on Repository {
          name
          url
          vulnerabilityAlerts(first: 10) {
            totalCount
            nodes {
              securityVulnerability {
                severity
                package { name }
                vulnerableVersionRange
                firstPatchedVersion { identifier }
                advisory { summary }
              }
            }
          }
        }
      }
    }
  }`

  const resp = await got.post(req.body.githubApiUrl, {
    headers: { Authorization: `Bearer ${req.body.githubApiToken}` },
    body: JSON.stringify({ query })
  }).json()

  res.status(200).json({ resp })
}
