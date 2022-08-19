async function normalizer(candidates) {

  let candidatesNormalized = [];

  candidates.map((candidate) => {
    candidatesNormalized.push({
      completeName: candidate[0],
      email: candidate[1],
      firstName: candidate[0].split(' ')[0],
      urlSheet: ''

    })
  })

  return candidatesNormalized
}


export { normalizer }