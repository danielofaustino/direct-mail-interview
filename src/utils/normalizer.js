async function normalizer(candidates) {

  let candidatesNormalized = [];

  const sortCandidates = (a, b) => {
    return (a.firstName == b.firstName) ? 0
      : (a.firstName < b.firstName) ? -1 : 1
  }

  try {

    await candidates.map((candidate) => {
      candidatesNormalized.push({
        completeName: candidate[0],
        email: candidate[1],
        firstName: candidate[0].split(' ')[0],
        urlSheet: ''

      })
    })

    candidatesNormalized.sort((a, b) => sortCandidates(a, b))

    return candidatesNormalized

  } catch (error) {
    console.error(error.message)
  }


}


export { normalizer }