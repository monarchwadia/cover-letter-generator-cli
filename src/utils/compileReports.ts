export async function compileReports(validation, mutation, abilities) {
    const finalReport = `
        Validation Result: ${validation}
        Mutation Effect: ${mutation}
        New Abilities Unlocked: ${abilities}
    `;
  
    return finalReport.trim();
  }
  